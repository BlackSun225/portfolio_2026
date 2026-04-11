"use client"
import Image from "next/image"

const error = "/error.gif"

export default function ProjectError() {
    return (
        <div>
            <Image src={error} width="300" height="300" alt="wrong request" />
            <strong>{"error fetching data"}</strong>
        </div>
    )
}