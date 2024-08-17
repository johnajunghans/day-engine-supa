import { RitualInstance } from "@/app/lib/interfaces/rituals-interface";

interface RitualSectorProps {
    svgSize: number
    instance: RitualInstance
}
 
const RitualSector: React.FC<RitualSectorProps> = ({ svgSize, instance }) => {
    return (
        <path
            d={`
                
            `}
        />
     );
}
 
export default RitualSector;