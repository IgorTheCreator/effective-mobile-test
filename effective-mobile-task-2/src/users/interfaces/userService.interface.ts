export interface IUserService {
  updateUsers: (
    data: { [key: string]: any },
    where: { [key: string]: any },
  ) => Promise<number>;
}
