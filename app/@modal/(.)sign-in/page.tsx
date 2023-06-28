import Modal from "@/components/modal"
import { SignIn } from "@clerk/nextjs"

export default function PageModal() {
  return (
    <Modal>
      <SignIn />
    </Modal>
  )
}
