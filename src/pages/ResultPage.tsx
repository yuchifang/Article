import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { pipe, _filter, packTagsString, countRepeatTag, _map, stringToLower, objToArr, _sort, _slice } from '../utils/utils'
import TopicPage from '../components/common/TopicBlock'
import { RouteComponentProps } from 'react-router-dom'
import Pagination from '../components/common/Pagination'
type LocationProp = {
    searchValue: string
}
interface ResultPageProps extends RouteComponentProps<{}, {}, LocationProp> {

}

export default function ResultPage({ location: { state: { searchValue } } }: ResultPageProps) {

    return (
        <>
            <TopicPage
                filter={true}
                titlePlace="center"
                showTitle={true}
                title={searchValue}
                wrap={true}
                rowsCount={2}
                columnsCount={100} />

        </>
    )
}
