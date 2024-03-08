import { DbContext } from '@/hooks/use_db';
import { FC, PropsWithChildren, createContext } from 'react';
import use_db from '@/hooks/use_db';


export const Db_context = createContext<DbContext | null>(null)
const Db_handle: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Db_context.Provider value={{ ...use_db! }}>
            {children}
        </Db_context.Provider>
    )
}

export default Db_handle