import Image from 'next/image';
import WorldMap from '../public/Simple_world_map.svg';

const WorldMapComponent = () => {
  return (
    <div className="flex items-center justify-center">
      <Image src={WorldMap} alt="world map" width={2000} height={1000} />
    </div>
  );
};
export default WorldMapComponent;