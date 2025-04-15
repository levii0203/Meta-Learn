import { ethers } from "ethers";
import { getProvider, getSigner } from "../ether/ether";
import { CourseContractABI, CourseContractAddress } from "../abi/course";

interface AddCourseProps {
    courseId: number;
    price: number;
}

interface BuyCourseProps {
    courseId: number
}

export const AddCourseFunction = async ({ courseId, price }: AddCourseProps): Promise<void> => {
    try {
        if (courseId < 0) throw new Error('Course ID cannot be negative');
        if (price < 0) throw new Error('Price cannot be negative');
        if (!Number.isInteger(price)) throw new Error('Price must be an integer');
        if (price > 2 ** 64 - 1) throw new Error('Price exceeds uint64 limit');
        const signer = await getSigner();
        const contract = new ethers.Contract(CourseContractAddress, CourseContractABI, signer );
        const tx = await contract.addCourse(courseId, price);
        await tx.wait();
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const BuyCourseFunction = async({courseId}:BuyCourseProps):Promise<void> => {
    try {
        const signer = await getSigner();
        const contract = new ethers.Contract(CourseContractAddress, CourseContractABI, signer );
        const tx = await contract.buyCourse(courseId);
        const receipt = await tx.wait();
        console.log(receipt);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const CompleteCourseFunction = async({courseId}:BuyCourseProps):Promise<void> => {
    try {
        const signer = await getSigner();
        const contract = new ethers.Contract(CourseContractAddress, CourseContractABI, signer );
        const tx = await contract.completeCourse(courseId);
        const receipt = await tx.wait();
        console.log(receipt);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const WithdrawCourseFunction = async({courseId}:BuyCourseProps):Promise<void> => {
    try {
        const signer = await getSigner();
        const contract = new ethers.Contract(CourseContractAddress, CourseContractABI, signer );
        const tx = await contract.withdrawCourse(courseId);
        const receipt = await tx.wait();
        console.log(receipt);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const CourseContract = async()=>{
    try{
        const signer = await getSigner();
        const contract = new ethers.Contract(CourseContractAddress, CourseContractABI, signer );
        return contract;
    }
    catch(err){
        console.log(err);
        return null;
    }
}