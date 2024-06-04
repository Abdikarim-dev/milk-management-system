import { DeleteTanksApi } from "@/apicalls/tanks";
import { DeleteUserApi } from "@/apicalls/users";
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
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

function DeleteTank(props) {
  const deleteTank = async () => {
    // Making the API CALL request and dealing with results
    try {
      const response = await DeleteTanksApi(props.tankId);

      if (response.success) {
        setTimeout(() => {
          toast.success(response.message);
        }, 500);
      } else {
        setTimeout(() => {
          console.log(response);
          toast.error(response.message);
        }, 500);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("AN ERROR OCCURED PLEASE TRY AGAIN!");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <p className="flex gap-2">
          <span className="text-red-600">
            <Trash2 />
          </span>
          <span className="">Delete</span>
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={`text-red-500`}>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this fuusto : {props.tankId}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteTank}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTank;
