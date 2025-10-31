import ViewButton from '@/components/common/ViewButton';
import EditButton from '@/components/common/EditButton';
import DeleteButton from '@/components/common/DeleteButton';

function ParentsTable({ onEdit, onDelete, parents }) {

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Parents ({parents?.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Children
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {parents?.map((parent) => (
                <tr key={parent._id} className="hover:bg-gray-50">
                  {/* Parent info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={parent.profileImage || "/parents-avatar.png"}
                          alt={parent.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {parent.name}
                        </div>
                        <div className="text-sm text-gray-500">{parent.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Children */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parent.children?.length > 0 ? (
                      <div className="text-sm text-gray-900">
                        {parent.children.map((child) => child.name).join(", ")}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">No children</span>
                    )}
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parent.phone ? (
                      <>
                        <div className="text-sm text-gray-900">{parent.phone}</div>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400 italic">No phone</span>
                    )}
                  </td>

                  {/* Joined */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(parent.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <ViewButton navigateTo={`/admin/parents/${parent._id}`} />
                      <EditButton onClick={() => onEdit(parent)} />
                      <DeleteButton onClick={() => onDelete(parent._id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ParentsTable