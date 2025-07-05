"use client"

import * as React from "react"
import { Input } from "./ui/input"
import { useSeats } from "@/context/SeatsContext";
import { Label } from "./ui/label";
import { SelectShowSeat } from "./select-show-seats"
import { Button } from "./ui/button";

export function FormSeatConfig() {
    const { seatConfig, setSeatConfig, seatGenerateConfig, setSeatGenerateConfig, generateReset,generateSeats } = useSeats();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSeatConfig({
            ...seatConfig,
            [name]: value,
        });
    };

    const handleSeatGenerateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSeatGenerateConfig({
            ...seatGenerateConfig,
            [name]: value,
        });
    };
    return (
        <div className="flex flex-col">
            <h1 className="font-black text-xl mx-5 mt-5">Seat Properties</h1>
            <div className="m-5 flex flex-row justify-start">
                <Label htmlFor="id">Show</Label>
                <SelectShowSeat />
            </div>
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
            <h1 className="font-black text-xl mx-5 mt-5">Generate Grid</h1>
            <div className="m-5 flex flex-row justify-start">
                <Label htmlFor="id">Position Start</Label>
                <Input name="start" type="start" placeholder="Posisition Start" value={seatGenerateConfig.start}
                    onChange={handleSeatGenerateChange} />
            </div>
            <div className="m-5 flex flex-row justify-start">
                <Label htmlFor="name">Jumlah Kolom</Label>
                <Input name="cols" type="cols" placeholder="Jumlah Kolom" value={seatGenerateConfig.cols}
                    onChange={handleSeatGenerateChange} />
            </div>
            <div className="m-5 flex flex-row justify-start">
                <Label htmlFor="category">Jumlah Baris</Label>
                <Input name="rows" type="rows" placeholder="Nama Kursi" value={seatGenerateConfig.rows}
                    onChange={handleSeatGenerateChange} />
            </div>
            <div className="w-full flex flex-row justify-start gap-2 m-5">
                <Button onClick={generateReset} variant="destructive" className="text-white">Delete</Button>
                <Button onClick={generateSeats} className="text-white">Generate</Button>
            </div>
        </div>
    )
}