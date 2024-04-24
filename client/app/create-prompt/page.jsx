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

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            if(!window.ethereum){
                throw new Error("Install crypto wallet to proceed.");
            }

            const account = await window.ethereum.request({
                "method": "eth_requestAccounts",
                "params": []
            });
            
            const formData = new FormData();
            formData.append("project_name", project.project_name);
            formData.append("description", project.description);
            formData.append("goal", project.goal);
            formData.append("timeToFund", new Date(project.timeToFund).getTime());
            formData.append("createdAt", Date.now());
            formData.append("tag", project.tag);
            formData.append("address", account[0]);
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