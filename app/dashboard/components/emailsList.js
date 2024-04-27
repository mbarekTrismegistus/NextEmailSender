"use client"

import { useQuery } from '@tanstack/react-query';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, SelectItem, Select, Spinner} from "@nextui-org/react";
import {Pagination} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@nextui-org/react';
import axios from 'axios';
import { useState } from 'react';





export default function EmailsList() {

    const params = useSearchParams()
    const router = useRouter()
    const [user, setUser] = useState(undefined)
    

    

    let page = Number(params.get("page"))

    const {data: emails, isFetching, isLoading, isError} = useQuery({
        queryKey: [page,'emails',user],
        queryFn: async () => {
          const data = await axios.post("/api/getEmailsHistory", { data: {
            take: 5,
            skip: (page * 5) - 5,
            user: user
          }})
          return data.data
        }
    })

    const {data: users, isLoading:isUsersLoading} = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
        const { data } = await axios.post("/api/getUsers")
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
        <Table
            topContent={
              isUsersLoading ? 
              <Skeleton className='rounded-xl w-full h-full'/>
              :
              <Select label="Users" placeholder="Select a user" onChange={(e) => setUser(e.target.value)}>
                  <SelectItem key={"all"} value={undefined}>
                    All
                  </SelectItem>
                  {users.map((u) => {
                    return(
                      <SelectItem key={u.id} value={u.id}>
                        {u.name}
                      </SelectItem>
                    )
                  })}
              </Select>
            }
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
            <TableBody loadingContent={<Spinner/>} emptyContent={"No rows to display."} loadingState={isFetching ? "loading" : "idle"}>
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
