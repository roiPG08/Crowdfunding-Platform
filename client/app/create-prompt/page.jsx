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
        walletId: '',
        tag: '',
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("caption", caption);
            await axios.post("/api/posts", formData, )
            
            let response = await createProjectApi(
                project.project_name,
                project.description,
                project.goal,
                project.timeToFund,
                project.imageFiles,
                session?.user.id,
                project.tag,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (response.ok) {
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