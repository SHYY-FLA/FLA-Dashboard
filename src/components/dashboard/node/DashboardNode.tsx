import * as _ from './style.ts'
import Plus from '../../../assets/dashboard/node/plus-circle.svg'

type Props = {
    width: number
    height: number
    location: number
    radius?: number
    primary?: string
    edit?: boolean
    highlight?: boolean
    onAddElement?: (location: number) => void
}

const DashboardNode = (props: Props) => {
    return (
        <_.DashboardNode $width={props.width}
                         $height={props.height}
                         $radius={props.radius}
                         $primary={props.primary}
                         $edit={props.edit}
                         $highlight={props.highlight}
                         className={"_FLA_DASHBOARD_BASE"}>
            {
                props.edit ? (
                    <_.Plus
                        src={Plus}
                        onClick={() => props.onAddElement?.(props.location)}
                    />
                ) : null
            }
        </_.DashboardNode>
    )
}

export default DashboardNode
