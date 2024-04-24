'use client';

import { useSession } from "next-auth/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Form from "@components/Form";
import project, { Project } from "@models/project"
import { createProjectApi } from "@services/context";
import project from "@models/project";

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
            
            const project = new {
              creator:   session?.user.id,
              project_name: project.project_name,
              description: project.description,
              wallet: account[0],
              currentFunds: 0,
              goal: project.goal,
              timeToFund: new Date(project.timeToFund).getTime(),
              createdAt: Date.now(),
              tag: project.tag,
              images: project.imageFiles
            };

            const response = await createProjectApi(project);
            
            alert("Project created successfully.");
            router.push('/');

            // if (response.status >= 200 && response.status < 300) {
            //     alert("Project created successfully.");
            //     router.push('/');
            // }
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