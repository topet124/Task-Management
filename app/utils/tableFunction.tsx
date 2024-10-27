import { format } from 'date-fns';
import { Target } from '@/lib/types';

export const TargetRow: React.FC<{ target: Target; updatePipelineStatus: (id: number, status: Target['pipelineStatus']) => void; openDropdown: number | null; setOpenDropdown: (id: number | null) => void; pipelineStatuses: Target['pipelineStatus'][] }> = ({ target, updatePipelineStatus, openDropdown, setOpenDropdown, pipelineStatuses }) => (
    <tr key={target.id} className="hover:bg-gray-100 transition-colors duration-200">
        <td className="border-b border-gray-300 p-3">{target.name}</td>
        <td className="border-b border-gray-300 p-3 relative">
            <button
                onClick={() => setOpenDropdown(openDropdown === target.id ? null : target.id)}
                className="w-full text-left text-gray-700 hover:underline"
            >
                {target.pipelineStatus || 'Not set'}
            </button>
            {openDropdown === target.id && (
                <div className="absolute z-10 bg-white border border-gray-300 shadow-lg mt-1 rounded-md">
                    {pipelineStatuses.map((status) => (
                        <button
                            key={status || 'null'}
                            onClick={() => {
                                updatePipelineStatus(target.id, status);
                                setOpenDropdown(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
                        >
                            {status || 'Not set'}
                        </button>
                    ))}
                </div>
            )}
        </td>
        <td className="border-b border-gray-300 p-3">
            {format(new Date(target.lastUpdated), 'yyyy-MM-dd HH:mm')}
        </td>
    </tr>
);


