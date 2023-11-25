'use client';

import { useSession } from "next-auth/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Form  from "@components/Form";

const CreatePrompt = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [project, setProject] = useState({
        project_name: '',
        description: '',
        goal: '',
        tag: ''
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try{
            const response = await fetch('api/project/new',{
                method: 'POST',
                body: JSON.stringify({
                    project_name: project.project_name,
                    description: project.description,
                    goal: project.goal,
                    userId: session?.user.id,
                    tag: project.tag
                })
            })

            if(response.ok){
                router.push('/');
            }
        }catch(error){
            console.log(error);
        }finally{
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