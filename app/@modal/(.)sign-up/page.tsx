import Modal from "@/components/modal"
import { SignUp } from "@clerk/nextjs"

export default function PageModal() {
  return (
    <Modal>
      <SignUp />
    </Modal>
  )
}
