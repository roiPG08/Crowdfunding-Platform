'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ProjectInfo from '@components/ProjectInfo';
import { useRouter, useSearchParams } from 'next/navigation'
import { getProjectById } from "@src/api/projects";
import { useDispatch } from 'react-redux';

const ProjectPage = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [data, setData] = useState({
        project_name: '',
        description: '',
        goal: 0,
        tag: ''
    });
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await getProjectById(promptId);
            const data = await response.json();

            setData({
                description: data.description,
                goal: data.goal,
                project_name: data.project_name,
                tag: data.tag,
            })
        };

        if (promptId) {
            getPromptDetails();
        }
    }, [promptId]);

    const handleDonate = async () => {
        console.log("TO BE DONE");
    }

    const handleAddToFavorite = async () => {
        console.log("TO BE DONE");
    }

    return (
        <ProjectInfo
            projectData={data}
            handleDonate={handleDonate}
            handleAddToFavorite={handleAddToFavorite}
        />
    )
}

export default ProjectPage