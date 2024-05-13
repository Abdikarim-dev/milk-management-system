import Modal from "react-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { X } from "lucide-react";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function UserModal() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3 className="text-3xl font-semibold text-center">Register User</h3>
        <div className=" ">
          <button onClick={closeModal}>
            <X size={40} color="red" className="absolute right-6 top-6" />
          </button>
        </div>
        <Form>
          <form className="space-y-8 w-[800px]">
            
            <FormItem>
              <Input  placeholder="Full Name" />
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormControl>
                <Input placeholder="shadcn" />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormControl>
                <Input placeholder="shadcn" />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormControl>
                <Input placeholder="shadcn" />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormControl>
                <Input placeholder="shadcn" />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormControl>
                <Input placeholder="shadcn" />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormControl>
                <Input placeholder="shadcn" />
              </FormControl>
              <FormMessage />
            </FormItem>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Modal>
    </div>
  );
}
