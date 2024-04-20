"use client"

import { useQuery } from '@tanstack/react-query';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import {Pagination} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@nextui-org/react';
import axios from 'axios';
import { trefoil } from 'ldrs'


trefoil.register()

export default function EmailsList() {

    const params = useSearchParams()
    const router = useRouter()

    let page = Number(params.get("page"))

    const {data: emails, isFetching, isLoading, isError} = useQuery({
        queryKey: [page,'emails'],
        queryFn: async () => {
          const data = await axios.post("/api/getEmailsHistory", { data: {
            take: 5,
            skip: (page * 5) - 5
          }})
          return data.data
        }
    })

    
  return (
        isLoading 
        ? 

          <Skeleton className="mt-[30px] rounded-lg">
            <div className="h-[200px] rounded-lg bg-default-300"></div>
          </Skeleton>

        :
        <Table aria-label="Example static collection table"
            bottomContent={
              
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={Math.ceil(emails.emailsCount/5)}
                    onChange={(page) => {
                      router.push(`/dashboard/?page=${page}`)
                    }}
                  />
                </div>
             
            }
            
            
          >
            <TableHeader>
              <TableColumn>Sender</TableColumn>
              <TableColumn>Receivers</TableColumn>
              <TableColumn>Template</TableColumn>
              <TableColumn>Date Sent</TableColumn>
            </TableHeader>
            <TableBody loadingContent={"loading"} loadingState={isFetching ? "loading" : "idle"}>
              {emails.data.map((e) => {
                return(
                  <TableRow key={e.id}>
                    <TableCell>{e.user.name}</TableCell>
                    <TableCell>{e.recievers.join(" - ")}</TableCell>
                    <TableCell>{e.template}</TableCell>
                    <TableCell>{e.dateSend.substring(0, 10)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
        </Table>
  )
}
