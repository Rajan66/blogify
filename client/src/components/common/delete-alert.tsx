import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
} from "@/components/ui/alert-dialog";
import React from "react";
import { handleDelete } from "@/lib/detail-handler";
import { AlertInterface } from "@/interface";

const AlertComponent = ({ id, router }: AlertInterface) => {
  return (
    <div>
      <div className="flex gap-4 mt-4">
        <center>
          <FontAwesomeIcon
            icon={faPen}
            size="1x"
            className="mr-3 text-blue-500 cursor-pointer"
            onClick={() => router.push(`/form/${id}`)}
          />
        </center>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <FontAwesomeIcon
              icon={faTrash}
              size="1x"
              className="mr-3 text-red-600 cursor-pointer"
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDelete({ id: id, router: router });
                }}
                className="bg-red-500 hover:bg-red-600"
              >
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AlertComponent;
