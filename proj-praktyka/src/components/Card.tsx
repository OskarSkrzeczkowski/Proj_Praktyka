import { Link } from 'react-router-dom'

interface Props {
    ses: string;
    name: string;
    aname: string;
    desc: string;
    img: string;
    imgAlt: string;
    path: string;
}

export const Card = ({ses, name, aname, desc, img, imgAlt, path}: Props) => {
    
    return(
        <Link to = {path}>
        <div className="pb-2">
            <div className="flex items-center gap-30 pb-2.5">
                <img className="h-12 w-12" src={img} alt={imgAlt}></img>
                <div className='flex justify-center items-center border-2 rounded-[10px] border-solid min-w-18 px-1 py-px h-8'>
                    <p className="font-bold">{ses}</p>
                </div>
            </div>
            <div className='card-1'>
                <h2 className='font-sans text-white text-2xl pb-2'>{name}</h2>
                <p className='font-sans text-xl text-white/90 pb-2'>{aname}</p>
                <p className='font-sans text-white/75'>{desc}</p>
            </div>
        </div>
        </Link>

    );
}
