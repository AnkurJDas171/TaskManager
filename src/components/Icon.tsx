import { ColorValue } from "react-native";
import * as Icons from "lucide-react-native";

const getIcon = (name: string) => {
    const namesObj: { [key: string]: Icons.LucideIcon } = {
        'search': Icons.Search,
        'trash': Icons.Trash,
        'ellipsis-menu': Icons.EllipsisVertical,
        'edit': Icons.Pencil,
        'check': Icons.Check,
        'add': Icons.Plus,
        'menu': Icons.Menu
    };
    return namesObj[name];
};

const Icon = ({
    name,
    size,
    color = "#000",
}: {
    name: string;
    size: number;
    color?: ColorValue;
}) => {
    const Component = getIcon(name);
    return <Component size={size} color={color} />;
};

export default Icon;
