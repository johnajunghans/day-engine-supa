import { Ritual } from "@/app/lib/interfaces/rituals-interface";
import { Flex } from "@chakra-ui/react";
import RitualTile from "./ritual-tile";

interface Rituals {
    rituals: Ritual[]
}

const Rituals: React.FC<Rituals> = ({ rituals }) => {
    return ( 
        <Flex id="rituals-container" 
            flexDir="column" 
            align="center" 
            justify="flex-start" 
            gap="1rem" 
            py="1rem"
        >
            {rituals.map(ritual => (
                <RitualTile 
                    key={ritual.id}
                    id={ritual.id} 
                    name={ritual.name} 
                    description={ritual?.description} 
                />
            ))}
        </Flex>
     );
}
 
export default Rituals;