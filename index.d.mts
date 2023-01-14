export function getIps({ allInfo }?: {
    allInfo?: boolean;
}): {} | [] | null;
export function getIpList(): any[];
export function findMyIp(): string | (() => AddressInfo) | (() => (AddressInfo | {})) | (() => (AddressInfo | string | null)) | boolean;
