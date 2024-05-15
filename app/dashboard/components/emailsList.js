"use client"

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {Table, TableHeader, TableColumn, Chip, TableBody, TableRow, TableCell, Button, SelectItem, Select, Spinner, Tooltip} from "@nextui-org/react";
import {Pagination} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@nextui-org/react';
import axios from 'axios';
import { useRef, useState } from 'react';
import { DeleteIcon } from '@/app/components/DeleteIcon';
import { Toast } from 'primereact/toast';
import { CheckCircle, CheckCircleFill, EyeFill } from 'react-bootstrap-icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"






export default function EmailsList() {

    const params = useSearchParams()
    const router = useRouter()
    const [user, setUser] = useState(undefined)
    const [status, setStatus] = useState(undefined)
    const queryClient = useQueryClient()
    const toast = useRef(null);

    
  
    let page = Number(params.get("page"))

    const {data: emails, isFetching, isLoading, isError} = useQuery({
        queryKey: [page,'emails',user, status],
        queryFn: async () => {
          const data = await axios.post("/api/getEmailsHistory", { data: {
            take: 5,
            skip: (page * 5) - 5,
            user: user,
            status: status
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

    const {mutate: handleDelete, isPending: isDeleting} = useMutation({
      mutationFn: async () => {
        await axios.post("/api/deleteHistory")
      },
      onSuccess: () => {
        toast.current.show({ severity: 'success', summary: 'success', detail: 'History Deleted !' });
        queryClient.invalidateQueries("emails")
      }
      
    })


    
  return (
        isLoading 
        ? 

          <Skeleton className="mt-[30px] rounded-lg before:!duration-1000">
            <div className="h-[200px] rounded-lg bg-default-300"></div>
          </Skeleton>

        :
        <Table
            topContent={
              isUsersLoading ? 
              <Skeleton className='rounded-xl w-full h-full before:!duration-1000'/>
              :
                <div className='md:flex gap-4'>
                    <Select label="Status" placeholder="Select a Status" onChange={(e) => setStatus(e.target.value)}>
                          <SelectItem key={"all"} value={undefined}>
                            All
                          </SelectItem>
                          <SelectItem key={"email.sent"} value={"email.sent"}>
                            Sent
                          </SelectItem>
                          <SelectItem key={"email.delivered"} value={"email.delivered"}>
                            Delivered
                          </SelectItem>
                          <SelectItem key={"email.opened"} value={"email.opened"}>
                            Opened
                          </SelectItem>

                    </Select>
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
                </div>

            }
            bottomContent={
              
                <div className="flex w-full justify-center relative">
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
                    className=''
                  />
                  <Toast ref={toast} />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="absolute right-0">
                        <Tooltip color="danger" content="Delete History">
                          <span className="text-xl text-center text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon/>
                          </span>
                        </Tooltip>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          account and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  
                </div>
             
            }
            
            
          >
            <TableHeader>
              <TableColumn>Sender</TableColumn>
              <TableColumn>Receivers</TableColumn>
              <TableColumn>Template</TableColumn>
              <TableColumn>Subject</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Date Sent</TableColumn>
            </TableHeader>
            <TableBody loadingContent={<Spinner/>} emptyContent={"No rows to display."} loadingState={isFetching || isDeleting ? "loading" : "idle"}>
              {emails.data.map((e) => {
                return(
                  <TableRow key={e.id}>
                    <TableCell>{e.user.name}</TableCell>
                    <TableCell>{e.recievers.join(" - ")}</TableCell>
                    <TableCell>{e.template}</TableCell>
                    <TableCell>{e.subject}</TableCell>
                    <TableCell>
                      <Chip color={e.status == "email.sent" ? "warning" : e.status == "email.delivered" ? "secondary" : "primary"} variant='flat'
                        startContent={e.status == "email.sent" ? <CheckCircle size={18} className='ms-1'/> : e.status == "email.delivered" ? <CheckCircleFill size={18} className='ms-1'/> : <EyeFill size={18} className='ms-1'/>}
                      >{e.status.substring(6)}</Chip>
                    </TableCell>
                    <TableCell>{e.dateSend.substring(0, 10)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
        </Table>
  )
}
