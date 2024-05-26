"use client";
const { createDataItemSigner, message, dryrun, result, results, spawn } = require("@permaweb/aoconnect")
import {arweaveWallet, getArweaveWalletAddress } from "./arweave-wallet";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");

  const aoMessage = async () => {
    await Promise.resolve({
      process: "hhsZ7WUT-YXx8Ufsxj8-wPRToy-GHtq2OgoaK8tvZYY",
      tags: [
        {name: "tag1", value: message}
      ],
      Target: "hhsZ7WUT-YXx8Ufsxj8-wPRToy-GHtq2OgoaK8tvZYY",
      signer: createDataItemSigner(arweaveWallet),

      data: message,
    }).then((res: any) => {
      console.log(res);
    }).catch((error: any) => {
      console.log(error);
    });
  };
  
  async function messages() {
    let resultsOut = await results({
      process: "hhsZ7WUT-YXx8Ufsxj8-wPRToy-GHtq2OgoaK8tvZYY",
      sort: "ASC",
      limit: 25,
    });
    console.log(getArweaveWalletAddress())
    setAddress(getArweaveWalletAddress());
    console.log(resultsOut);
  }
  messages();
  
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e.target.message.value);
    await aoMessage();
  }

  return (
    <div className="bg-black text-white h-screen p-4 flex flex-col gap-5">
      <div className="flex justify-center text-xl font-semibold">
        Messaging app
      </div>
      <div className="flex justify-center text-lg font-medium mt-2">
        A place on AO where users can upload messages to the ao (arweave parallel processing computer).
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center mt-4 mx-16">
        <Label>Message</Label>
        <Input className="mt-2" type="text" name="message" onChange={(e) => setMessage(e.target.value)}/>
        <br />
        <Button type="submit">Submit</Button>
      </form>
      <div className="flex justify-center text-lg font-medium mt-2">
        Your address: {address}
      </div>
    </div>
  );
}

