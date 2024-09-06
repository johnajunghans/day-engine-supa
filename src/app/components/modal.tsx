import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'
import { useThemeContext } from '../hooks/useThemeContext'

interface ModalMainProps {
    children: React.ReactNode
    isOpen: boolean,
    onClose: () => void,
    modalTitle: string,
}
 
const ModalMain: React.FC<ModalMainProps> = ({ children, isOpen, onClose, modalTitle }) => {

    const { theme } = useThemeContext()

    return ( 
        <Modal isOpen={isOpen} onClose={onClose} size="2xl" >
        <ModalOverlay />
        <ModalContent color="white" bgColor="var(--white-bg)" className="bg-opacity-75" backdropFilter="blur(6px)" border="1px solid var(--de-orange-light)">
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            { children }
          </ModalBody>
          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
     );
}
 
export default ModalMain;