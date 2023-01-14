export function getIps({ allInfo }?: {
    allInfo?: boolean;
}): {} | [] | null;
export function getIpList(): any[];
export function findIp(): string | (() => AddressInfo) | (() => (AddressInfo | {})) | (() => (AddressInfo | string | null)) | boolean;
