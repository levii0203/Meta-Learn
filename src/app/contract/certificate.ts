import { ethers } from "ethers";
import { getProvider, getSigner } from "../ether/ether";
import { CertificateContractABI , CertificateContractAddress } from "../abi/certificate";


interface courseId {
    courseId:number
}

interface tokenId{
    tokenId:number
}

interface checkCertArg {
    courseId:number,
    signer_address:string
}

export const MintCertificateFunction = async ({courseId}:courseId)=>{
    try {
        const signer = await getSigner();
        const contract = new ethers.Contract(CertificateContractAddress, CertificateContractABI, signer );
        const tx = await contract._mintCertificate(courseId);
        await tx.wait();
    } catch(error){
        console.error(error);
    }
}

export const CheckCertificateFunction = async ({courseId,signer_address}:checkCertArg)=>{
        try {
            const provider = await getProvider();
            const contract = new ethers.Contract(CertificateContractAddress, CertificateContractABI, provider);
            const tx = await contract._checkCertificate(courseId,signer_address);
            return tx;
        } catch(error){
            console.error(error);
            return null;
        }
}

export const CheckCertificateCourseIdFunction = async ({tokenId}:tokenId)=>{
    try {
        const provider = await getProvider();
        const contract = new ethers.Contract(CertificateContractAddress, CertificateContractABI, provider);
        const tx = await contract._checkCourse(tokenId);
        return tx;
    } catch(error){
        console.error(error);
        return null;
    }
}

