export default interface ICreateChatButton{
    label: string;
    onClick?: ()=>void;
    disabled?: boolean;
    className?: string;
}