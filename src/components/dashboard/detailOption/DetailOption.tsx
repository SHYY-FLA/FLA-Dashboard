import * as _ from './style.ts'

interface Props {
    x: number
    y: number
    editModeStatus: boolean
    editModeHandler: (e: React.MouseEvent) => void
    deleteHandler?: () => void
}

const DetailOption = (props: Props) => {
    return (
        <_.OptionsContainer x={props.x} y={props.y}>
            <_.Option onClick={props.editModeHandler}>
                <_.OptionTitle>{props.editModeStatus ? '수정 완료' : '수정 하기'}</_.OptionTitle>
            </_.Option>
            {props.deleteHandler && (
                <_.Option onClick={props.deleteHandler}>
                    <_.OptionTitle>삭제</_.OptionTitle>
                </_.Option>
            )}
        </_.OptionsContainer>
    )
}

export default DetailOption
