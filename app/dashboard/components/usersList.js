"use client"

import { useMutation, useQuery } from '@tanstack/react-query';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip, Skeleton, Spinner} from "@nextui-org/react";
import axios from 'axios';
import { trefoil } from 'ldrs'
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
import { useRef } from 'react';


trefoil.register()

export default function UsersList() {

    const queryClient = useQueryClient()
    const toast = useRef(null);

    const {data, isFetching, isLoading, isError} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const { data } = await axios.post("/api/getUsers")
          return data.data
        }
    })

    const {mutate: handleDelete, isPending} = useMutation({
      mutationFn: async (id) => {
        await axios.post("/api/deleteUser", { data: id})
      },
      onSuccess: () => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: 'User Deleted !' });
        queryClient.invalidateQueries("users")
      }
      
    })

    
    return (
        isLoading
        ? 
        <Skeleton className="mt-[30px] rounded-lg">
            <div className="h-[200px] rounded-lg bg-default-300"></div>
        </Skeleton>
        :
        <div>
          <Toast ref={toast} />
          <Table classNames={{
              base: "max-h-[300px] overflow-y-scroll"}} aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>SMTP Password</TableColumn>
                <TableColumn>Role</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody loadingContent={"loading"} loadingState={isFetching || isPending ? <Spinner color='primary'/> : "idle"}>
                {data.map((e) => {
                  return(
                    <TableRow key={e.id}>
                      <TableCell>{e.name}</TableCell>
                      <TableCell>{e.email}</TableCell>
                      <TableCell>{e.smptpass}</TableCell>
                      <TableCell>{e.role}</TableCell>
                      <TableCell className='flex items-center'>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline">
                                    <Tooltip color="danger" content="Delete user">
                                      <span className="text-xl text-center text-danger cursor-pointer active:opacity-50">
                                        <DeleteIcon />
                                      </span>
                                    </Tooltip>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure? {e.id}</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete your
                                      account and remove your data from our servers.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(e.id)}>Continue</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
          </Table>
          
        </div>
    )
}
