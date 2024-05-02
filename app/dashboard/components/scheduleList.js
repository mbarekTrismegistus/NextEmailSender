"use client"

import { useMutation, useQuery } from '@tanstack/react-query';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip, Skeleton, Spinner, Avatar, Select, SelectItem} from "@nextui-org/react";
import {useDisclosure} from "@nextui-org/react";
import axios from 'axios';
import { DeleteIcon } from '@/app/components/DeleteIcon';
import { useQueryClient } from '@tanstack/react-query';
import { Toast } from 'primereact/toast';
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
import { useRef, useState } from 'react';


export default function ScheduleList() {

    const queryClient = useQueryClient()
    const toast = useRef(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [user, setUser] = useState()
    const [userData, setUserData] = useState(user || {})

    
    function handleUserData(e){
      setUserData((prev) => {
        return{
          ...prev,
          [e.target.name]: e.target.value
        }
      })
    }



    const {data, isFetching, isLoading, isError} = useQuery({
        queryKey: ['schedule'],
        queryFn: async () => {
          const { data } = await axios.post("/api/getSchedule")
          return data.data
        }
    })

    const {mutate: handleDelete, isPending} = useMutation({
      mutationFn: async (id) => {
        await axios.post("/api/deleteSchedule", { data: id})
      },
      onSuccess: () => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: 'Scheduled email Deleted !' });
        queryClient.invalidateQueries("schedule")
      }
      
    })

    const {mutate: handleUpdate, isPending: isUpdating} = useMutation({
      mutationFn: async (id) => {
        await axios.post("/api/updateUser", { data: {
          id: userData.id || user.id,
          data: userData
        }})
      },
      onSuccess: () => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: 'User Updated !' });
        queryClient.invalidateQueries("users")
      }
      
    })


    
    return (
        isLoading
        ? 
        <Skeleton className="mt-[30px] rounded-lg before:!duration-1000">
            <div className="h-[200px] rounded-lg bg-default-300"></div>
        </Skeleton>
        :
        <div>
          <Toast ref={toast} />
          <Table classNames={{
              base: "max-h-[300px] overflow-y-scroll"}} aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>Sender</TableColumn>
                <TableColumn>Receivers</TableColumn>
                <TableColumn>Date</TableColumn>
                <TableColumn>Subject</TableColumn>
                <TableColumn>Template</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody loadingContent={"loading"} loadingState={isFetching || isPending ? <Spinner color='primary'/> : "idle"}>
                {data.map((e) => {
                  return(
                    <TableRow key={e.id}>
                      <TableCell className='flex items-center gap-3'>{e.user.name}</TableCell>
                      <TableCell>{e.recievers.join(" - ")}</TableCell>
                      <TableCell>{`${e.date.substring(0, 10)}`}</TableCell>
                      <TableCell>{e.subject}</TableCell>
                      <TableCell>{e.template}</TableCell>
                      <TableCell>
                        <div className='relative flex items-center gap-2'>
                          <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline">
                                    <Tooltip color="danger" content="Delete">
                                      <span className="text-xl text-center text-danger cursor-pointer active:opacity-50">
                                        <DeleteIcon />
                                      </span>
                                    </Tooltip>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will be permanently deleted
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(e.id)}>Continue</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                          </AlertDialog>
                        </div>
                              
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
          </Table>
          
        </div>
    )
}
