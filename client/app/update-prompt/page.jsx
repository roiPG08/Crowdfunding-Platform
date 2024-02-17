'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import Form from "@components/Form";
import {updateProjectApi, getProjectById} from "@src/api/projects";


const UpdatePrompt = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = getProjectById(promptId);
            const data = await response;

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        };

        if (promptId) {
            getPromptDetails();
        }

    }, [promptId]);

    const editPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        if(!promptId) return alert('Prompt ID not found');

        try{
            let response = updateProjectApi(promptId, post.prompt, post.tag);

            if(response.ok){
                router.push('/');
                return alert('Record updated.');
            }
        }catch(error){
            console.log('Something wen wrong');
        }finally{
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={(editPrompt)}
        />

    )
}

export default UpdatePrompt