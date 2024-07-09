import React from 'react'
import {img_300, unavailable} from '../../config/config'
import { Badge } from '@mui/material'
import ContentModal from '../ContentModal/ContentModal'

const SingleCard = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
}) => {
  return (
    <ContentModal
    media_type={media_type} 
    id={id}
    className='flex flex-col w-[200px] p-1 my-2 bg-slate-500 rounded-xl relative hover:bg-white text-black'
    >
        <Badge 
        badgeContent={vote_average.toFixed(1)}
        color={vote_average > 6 ? "primary" : "secondary"}
        />
        <img 
        className='rounded-xl' 
        src={poster? `${img_300}${poster}` : unavailable}
        alt={title}
        />
        <b
        className='w-full text-center text-lg font-semibold py-2'
        >{title}</b>
        <span
        className='flex justify-between px-1 pb-1'
        >
            {media_type === "tv" ? "TV Series" : "Movie"}
            <span
            className='flex justify-between px-1 pb-1'
            >{date}</span>
        </span>
    </ContentModal>
  )
}

export default SingleCard