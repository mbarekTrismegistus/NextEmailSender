"use client"

import { useMutation, useQuery } from '@tanstack/react-query';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip, Skeleton, Spinner, Avatar, Select, SelectItem} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input} from "@nextui-org/react";
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
import { EditIcon } from '@/app/components/editIcon';


export default function UsersList() {

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
    console.log(userData)


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
                      <TableCell className='flex items-center gap-3'><Avatar size='lg' src={e.image}/>{e.name}</TableCell>
                      <TableCell>{e.email}</TableCell>
                      <TableCell>{e.smptpass}</TableCell>
                      <TableCell>{e.role}</TableCell>
                      <TableCell>
                        <div className='relative flex items-center gap-2'>
                          <Button variant="outline" onPress={() => {
                            onOpen()
                            setUser(e)
                          }} >
                          <Tooltip content="Update user">
                                  <span className="text-xl text-center cursor-pointer active:opacity-50">
                                    <EditIcon />
                                  </span>
                          </Tooltip>
                          </Button>
                          <Modal 
                                isOpen={isOpen} 
                                onOpenChange={onOpenChange}
                                placement="top-center"

                              >
                                <ModalContent>
                                  {(onClose) => (
                                    <>
                                      <ModalHeader className="flex flex-col gap-1">Update {user.name} Informations</ModalHeader>
                                      <ModalBody>
                                        <Input
                                          autoFocus
                                          label="Name"
                                          placeholder="Enter Name"
                                          value={userData.name}
                                          variant="bordered"
                                          name='name'
                                          onChange={(e) => handleUserData(e)}
                                        />

                                        <Input
                                          autoFocus
                                          label="Email"
                                          placeholder="Enter email"

                                          variant="bordered"
                                          name='email'
                                          onChange={(e) => handleUserData(e)}
                                        />

                                        <Input
                                          autoFocus
                                          label="SMTP Pass"
                                          placeholder="Enter SMTP Password"

                                          variant="bordered"
                                          name='smptpass'
                                          onChange={(e) => handleUserData(e)}
                                        />
                                        
                                        <Input
                                          label="Password"
                                          placeholder="Enter your password"
                                          type="password"
                                          variant="bordered"
                                          name='password'
                                          onChange={(e) => handleUserData(e)}
                                        />

                                        <Select label={"role"} name='role' onChange={(e) => handleUserData(e)}>
                                          <SelectItem key={"admin"} value={"admin"}>
                                            Admin
                                          </SelectItem>
                                          <SelectItem key={"user"} value={"user"}>
                                            User
                                          </SelectItem>
                                        </Select>
                                      
                                      </ModalBody>
                                      <ModalFooter>
                                        <Button color="danger" variant="flat" onPress={onClose}>
                                          Close
                                        </Button>

                                        <Button color="primary" onPress={() => {
                                          onClose()
                                          handleUpdate()
                                        }}>
                                          Sign in
                                        </Button>
                                      </ModalFooter>
                                    </>
                                  )}
                                </ModalContent>
                          </Modal>
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
