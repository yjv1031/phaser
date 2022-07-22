import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import Temp1 from '../pages/temp1';
import Temp2 from '../pages/temp2';
import AvoidBullets from '../pages/avoidBullets/avoidBullets';

export interface RootChildren {
    path: string;
    label: string;
    element: JSX.Element;
}

export interface Root {
    icon: any;
    label: string;
    children: Array<RootChildren>
}

const RouteArr: Array<Root> = [
    {
        icon: LaptopOutlined,
        label: '총알피하기',
        children: [
            {
                path: '/phaser/avoidBullets/game',
                label: '게임하러가기',
                element: (<><AvoidBullets /></>)
            }
        ]
    },
    {
        icon: NotificationOutlined,
        label: '?',
        children: [
            {
                path: '/phaser/t1',
                label: '게임하러가기',
                element: (<><Temp1 /></>)
            },
            {
                path: '/phaser/t2',
                label: '랭킹게시판',
                element: (<><Temp2 /></>)
            }
        ]
    },
    {
        icon: UserOutlined,
        label: '??',
        children: [
        ]
    },
];

export default RouteArr;