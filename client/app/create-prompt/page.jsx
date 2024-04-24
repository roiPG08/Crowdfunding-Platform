'use client';

import { useSession } from "next-auth/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Form from "@components/Form";
import { ethers } from 'ethers';
import { abi }  from "../../artifacts/contracts/Campaign.sol/Campaign.json";

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

            //const provider = new ethers.providers.JsonRpcProvider();
            //const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_LOCALHOST_PRIVATE_KEY, provider);
             const provider = new ethers.providers.Web3Provider(window.ethereum);
             const signer = provider.getSigner();
            const Campaign = new ethers.Contract(process.env.NEXT_PUBLIC_LOCALHOST_CONTRACT_ADDRESS, abi, signer);
            console.log(account[2]);    
            
            const request = await Campaign.createProject(session?.user.id, project.project_name, project.description, project.goal, new Date(project.timeToFund).getTime(), Date.now(), project.tag, project.imageFiles);

            setTimeout(() => {
                alert("Project created successfully.");
                router.push('/');
            }, 4000);

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