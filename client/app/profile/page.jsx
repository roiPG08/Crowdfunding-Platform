'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import { deleteProjectApi } from "@src/api/projects";
import Profile from '@/components/Profile';

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [ projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects= async () => {
            const response = await fetch(`http://localhost:8080/api/${session?.user.id}/projects`);
            const data = await response.json();
            setProjects(data);
        };

        if(session?.user.id) fetchProjects();
    }, [session?.user.id])

    const handleEdit = (projects) => {
        router.push(`/update-prompt?id=${projects._id}`);
    }

    const handleDelete = async (project) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if(hasConfirmed){
            try {
                // await deleteProjectApi(project._id);

                const filteredProjects = projects.filter((p) => p._id !== project._id)

                setProjects(filteredProjects);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Profile
            name="Your "
            desc="You can have here some description"
            data={projects}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile