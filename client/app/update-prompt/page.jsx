'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import Form from "@components/Form";


const UpdatePrompt = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    const searchParams = useSearchParams();
    console.log(`Use search by id ${searchParams}`);
    const promptId = searchParams.get('id');

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        };

        if (promptId) getPromptDetails();

    }, [promptId]);

    const editPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        if(!promptId) return alert('Prompt ID not found');

        try{
            const response = await fetch(`api/prompt/${promptId}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                }),
            })

            if(response.ok){
                console.log('Is it even doing it?');
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