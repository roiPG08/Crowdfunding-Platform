'use client';

import { useSession } from "next-auth/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Form from "@components/Form";
import { createProjectApi } from "@src/api/projects";


const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [project, setProject] = useState({
        project_name: '',
        description: '',
        goal: 0,
        currentFund: 0,
        timeToFund: '',
        imageFiles: [],
        location: '',
        walletId: '',
        tag: '',
    });

    const calculateDaysLeft = () => {
        if (!project.timeToFund) {
          return null; 
        }
    
        const deadlineDate = new Date(project.timeToFund); 
        const currentDate = new Date(); 
    
        const differenceMs = deadlineDate - currentDate;
    
        const daysLeft = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

        return daysLeft;
      };

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("project_name", project.project_name);
            formData.append("description", project.description);
            formData.append("goal", project.goal);
            formData.append("timeToFund", calculateDaysLeft());
            formData.append("tag", project.tag);
            formData.append("location", project.location);
            formData.append("userId", session?.user.id);
            
            project.imageFiles.forEach(element => {
                formData.append("images", element);
            });

            let response = await createProjectApi(formData);

            if (response.status >= 200 && response.status < 300) {
                alert("Project created successfully.");
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <Form
            type="Create"
            post={project}
            setPost={setProject}
            submitting={submitting}
            handleSubmit={createPrompt}
        />

    )
}

export default CreatePrompt