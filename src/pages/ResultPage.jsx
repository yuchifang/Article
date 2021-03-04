import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { pipe, _filter, packTagsString, countRepeatTag, _map, stringToLower, objToArr, _sort, _slice } from '../utils'
import TopicBlock from '../components/common/TopicBlock'
export default function ResultPage({ location: { state: { searchValue } } }) {

    return (
        <TopicBlock
            filter={true}
            titlePlace="center"
            showTitle={true}
            title={searchValue}
            wrap={true}
            rowsCount={2}
            columnsCount={100} />
    )
}
