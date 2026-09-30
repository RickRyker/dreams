import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, ShieldAlert, Search, Clock } from 'lucide-react';
import { apiUrl } from "../config/api";

interface ChatLogEntry {
  id: string;
  content: string;
  type: string;
  createdAt: string;
  senderIp: string;
  player?: { name: string } | null;
}

export const ChatLogComponent: React.FC = () => {
  const [logs, setLogs] = useState<ChatLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');

  const fetchLogs = async () => {
      try {
          const resp = await axios.get(apiUrl("/admin/chat-logs"));
          setLogs(resp.data);
          setLoading(false);
      } catch (err) {
          console.error('Failed to fetch chat logs', err);
      }
  };

  useEffect(() => {
    void fetchLogs();
  }, []);

  const handleShadowBan = async (ip: string) => {
    if (!confirm(`Are you sure you want to shadow-ban the IP: {ip}?`)) return;
    try {
      await axios.post(apiUrl("/admin/shadow-ban"), { ip });
      alert('IP shadow-banned successfully');
    } catch (err) {
      console.error('Failed to shadow-ban IP', err);
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               (log.player?.name || '').toLowerCase().indexOf(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || log.type === filterType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return <div className="p-8 tet-gray-500 italic font-mono">Loading transaction logs...</div>;
  }

  return (
    <div className="p-8 w-full h-full flex flex-col bg-gray-900 text-white">
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
                <MessageSquare className="text-purple-500" size={28}/>
                <h2 className="text-3xl font-bold tracking-tighter uppercase">Chat Audit Log</h2>
            </div>
            <div className="flex gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 test-gray-500" size={16}/>
                    <input
                        type="text"
                        placeholder="Search content or author..."
                        className="bg-black border border-gray-700 pl-10 pr-4 py-2 rounded-lg text-sm focus:border-purple-500 outline-none w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="bg-black border border-gray-700 px-3 py-2 rounded-lg text-sm outline-none focus:border-purple-500"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}>
                    <option value="ALL">All Messages</option>
                    <option value="ADMIN">Admin Messages</option>
                    <option value="BOT">Bot Messages</option>
                    <option value="PLAYER">Player Messages</option>
                    <option value="SYSTEM">System Messages</option>
                </select>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {filteredLogs.map((log) => (
                <div key={log.id} className="group bg-black border border-gray-900 hover:border-gray-700 p-3 rounded flex justify-between items-start transition-colors">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                            <span className={`px-1.5 py-0.5 rounded ${
                                log.type === 'PLAYER' ? 'bg-blue-900 text-blue-300' :
                                log.type === 'BOT' ? 'bg-green-900 text-green-300' :
                                log.type === 'ADMIN' ? 'bg-red-900 text-red-300' :
                                'bg-gray-900 text-gray-300'
                            }`}>{log.type}</span>
                            <span className="text-gray-600 flex items-center gap-1">
                                <Clock size={10} /> {new Date(log.createdAt).toLocaleString()}
                            </span>
                            <span className="text-purple-400">{log.player?.name || 'SYSTEM'}</span>
                        </div>
                        <p className="text-gray-300 text-sm mt-1">{log.content}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity">
                        <button
                            onClick={() => handleShadowBan(log.senderIp)}
                            className="p-2 text-red-500 hover:bg-red-900/20 rounded transition-colors border border-transparent hover:border-red-900"
                            title="Shadow Ban IP"
                        >
                            <ShieldAlert size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

};
