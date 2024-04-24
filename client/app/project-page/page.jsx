'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ProjectInfo from '@components/ProjectInfo';
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { ethers } from 'ethers';
import { abi }  from "../../artifacts/contracts/Campaign.sol/Campaign.json";

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
    const projectId = searchParams.get('id');
    const [error, setError] = useState("");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Campaign = new ethers.Contract(process.env.NEXT_PUBLIC_LOCALHOST_CONTRACT_ADDRESS, abi, signer);  

    useEffect(() => {
        const getPromptDetails = async () => {

            const project = await Campaign.getProjectById(projectId);
            const fetchUserData = await fetch(`/api/users/${project.creatorId}`);
            const userData = await fetchUserData.json();
            
            const receivedData = {
                id: project.id.toNumber(),
                creator: userData,
                project_name: project.name,
                description: project.description,
                projectOwner: project.projectOwner,
                isFunded: project.isFunded,
                status: project.status,
                goal: project.goal.toNumber(),
                tag: project.tag,
                images: project.images,
                timeToFund: project.unlockTime.toNumber(),
                creationDate: project.creationDate.toNumber(),
                currentFunds: ethers.utils.formatEther(project.currentFunds),
                transactions: project.transactions
            };
            
            console.log(receivedData);

            setData({
                creator: receivedData.creator,
                project_name: receivedData.project_name,
                description: receivedData.description,
                wallet: receivedData.projectOwner,
                currentFunds: receivedData.currentFunds,
                goal: receivedData.goal,
                donates: receivedData.transactions,
                timeToFund: receivedData.timeToFund,
                tag: receivedData.tag,
                images: receivedData.images
            });
        };

        if (projectId) {
            getPromptDetails();
        }
    }, [projectId]);

    const fundProject = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            if(!window.ethereum){
                throw new Error("Install crypto wallet to proceed.");
            }
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const Campaign = new ethers.Contract(process.env.NEXT_PUBLIC_LOCALHOST_CONTRACT_ADDRESS, abi, signer);  

            const tx = await Campaign.fundProject(projectId, {value: ethers.utils.parseUnits(fundAmount, 'ether')})

            console.log(tx);

        } catch (error) {
            setError(error);
        } finally {
            setSubmitting(false);
        }
    }

    const handleWithdrawal = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            if(!window.ethereum){
                throw new Error("Install crypto wallet to proceed.");
            }
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const Campaign = new ethers.Contract(process.env.NEXT_PUBLIC_LOCALHOST_CONTRACT_ADDRESS, abi, signer);  

            console.log("Withdrawing started...");

            const withdraw = await Campaign.withdrawFunds(projectId, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

            console.log(withdraw);
            
        } catch (error) {
            setError(error);
        } finally {
            setSubmitting(false);
        }
    }

    const handleAddToFavorite = async () => {
        try {
            //const response = await addToFavoritesApi(promptId);

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
            handleWithdrawal={handleWithdrawal}
            error={error}
        />
    )
}

export default ProjectPage