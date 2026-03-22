"use client"
import error from "@/public/error.gif"
import Image from "next/image"

export default function ProjectError() {
    return (
        <div>
            <Image src={error} width="300" alt="wrong request" />
            <strong>{"error fetching data"}</strong>
        </div>
    )
}