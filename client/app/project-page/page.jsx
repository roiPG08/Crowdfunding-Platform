'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ProjectInfo from '@components/ProjectInfo';
import { useRouter, useSearchParams } from 'next/navigation'
import { getProjectById, fundProjectApi } from "@src/api/projects";
import { useDispatch } from 'react-redux';
import { useAddress } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const ProjectPage = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [data, setData] = useState({
        creator: '',
        project_name: '',
        description: '',
        wallet: '',
        currentFunds: 0,
        goal: 0,
        donates: [],
        timeToFund: '',
        tag: '',
        location: '',
        images: []
    });
    const [fundAmount, setFundAmount] = useState(0);
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const address = useAddress();
    const [error, setError] = useState("");

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await getProjectById(promptId);
            const data = await response.json();

            setData({
                creator: data.creator,
                project_name: data.project_name,
                description: data.description,
                wallet: data.wallet,
                currentFunds: data.currentFunds,
                goal: data.goal,
                donates: data.donates,
                timeToFund: data.timeToFund,
                tag: data.tag,
                location: data.location,
                images: data.images
            });
        };

        if (promptId) {
            getPromptDetails();
        }
    }, [promptId]);

    const fundProject = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            if(!window.ethereum){
                throw new Error("Install crypto wallet to proceed.");
            }

            // if(fundAmount < 10){
            //     throw new Error("Come on, don't be such a poory - pay more...")
            // }

            const account = await window.ethereum.request({
                "method": "eth_requestAccounts",
                "params": []
            });
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const tx = await signer.sendTransaction({
                to: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",// test address - address suplied by the fetching project data
                value: ethers.utils.parseUnits(fundAmount, 'ether')
            });
            console.log(tx);
            return alert('Funding sent successfully.');
            // const response = await fundProjectApi(promptId, account[0], fundAmount);

            // if (response.ok) {
            //     return alert('Funding sent successfully.');
            // }
        } catch (error) {
            setError(error);
        } finally {
            setSubmitting(false);
        }
    }

    const handleAddToFavorite = async () => {
        try {
            //await addToFavoritesApi(promptId);

            // if (response.ok) {
            //     return alert('Added to favorites.');
            // }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }    }    

    return (
        <ProjectInfo
            projectData={data}
            setFundAmount={setFundAmount}
            handleDonate={fundProject}
            handleAddToFavorite={handleAddToFavorite}
            error={error}
        />
    )
}

export default ProjectPage