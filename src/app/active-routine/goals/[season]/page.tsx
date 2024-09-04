import { Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface SeasonGoalsProps {
    params: { season: string }
}

export async function generateStaticParams() {
    const seasons = ['spring', 'summer', 'fall', 'winter'];

    return seasons.map(season => ({
        season,
    }));
}
 
const SeasonGoals: FunctionComponent<SeasonGoalsProps> = ( { params }) => {

    const season = params.season

    return (  
        <Flex color="white">
            {season}
        </Flex>
    );
}
 
export default SeasonGoals;