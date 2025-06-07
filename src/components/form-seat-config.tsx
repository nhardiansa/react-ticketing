"use client"

import * as React from "react"
import { Input } from "./ui/input"
import { useSeats } from "@/context/SeatsContext";
import { Label } from "./ui/label";


export function FormSeatConfig() {
    const { seatConfig, setSeatConfig } = useSeats();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSeatConfig({
            ...seatConfig,
            [name]: value,
        });
    };
    return (
        <div className="flex flex-row justify-start">
            <div className="m-5 flex flex-row justify-start">
                <Label htmlFor="id">ID</Label>
                <Input name="id" type="id" placeholder="ID" value={seatConfig.id}
                    onChange={handleChange} />
            </div>
            <div className="m-5 flex flex-row justify-start">
                <Label htmlFor="name">Nomor Kursi</Label>
                <Input name="name" type="name" placeholder="Nama Kursi" value={seatConfig.name}
                    onChange={handleChange} />
            </div>
            <div className="m-5 flex flex-row justify-start">
                <Label htmlFor="category">Kategori</Label>
                <Input name="category" type="category" placeholder="Nama Kursi" value={seatConfig.category}
                    onChange={handleChange} />
            </div>
            <div className="m-5 flex flex-row justify-start">
                <Label htmlFor="name">Warna Kursi</Label>
                <Input name="color" type="color" placeholder="Warna Kursi" value={seatConfig.color}
                    onChange={handleChange} />
            </div>

        </div>
    )
}