'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import Form from "@components/Form";
// import { updateProjectApi, getProjectById } from "@src/api/projects";
import { useDispatch } from 'react-redux';


const UpdatePrompt = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        project_name: '',
        description: '',
        goal: 0,
        tag: ''
    });
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(() => {
        const getPromptDetails = async () => {
            // const response = await getProjectById(promptId);
            // const data = await response.json();

            // setPost({
            //     description: data.description,
            //     goal: data.goal,
            //     project_name: data.project_name,
            //     tag: data.tag,
            // })
        };

        if (promptId) {
            getPromptDetails();
        }

    }, [promptId]);

    const clear = () => {
        setPost({ project_name: '', description: '', goal: 0, tags: '' });
    };

    const editPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert('Prompt ID not found');

        try {
            await updateProjectApi(promptId, post.project_name,
                post.description,
                post.goal,
                post.tag);

            router.push('/');
            return alert('Record updated.');

        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={editPrompt}
        />

    )
}

export default UpdatePrompt