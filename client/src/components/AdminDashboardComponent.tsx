// client/src/components/AdminDashboardComponent.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutGrid, Shield, AlertTriangle, Hammer, Save, RefreshCw } from 'lucide-react';
import { apiUrl } from "../config/api";

interface AdminConfig {
  isMaintenanceMode: boolean;
  bypassMaintenance: boolean;
  bufferSize?: number;
  maintenanceStart?: string;
  logPruneDays?: number;
}

export const AdminDashboardComponent: React.FC = () => {
    const [config, setConfig] = useState<AdminConfig | null>(null);
    const [maintenanceMinutes, setMaintenanceMinutes] = useState(5);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetchConfig = async () => {
        try {
            const resp = await axios.get(apiUrl("/admin/config"));
            setConfig(resp.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch config.', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchConfig();
    }, []);

    const toggleMaintenance = async () => {
        setSaving(true);
        try {
            await axios.get(apiUrl("/admin/maintenance/toggle"));
            await fetchConfig();
        } catch {
            alert('Failed to toggle maintenance');
        } finally {
            setSaving(false);
        }
    };

    const triggerDecay = async () => {
        if (!confirm('Are you sure you want to force item decay processing?')) return;
        try {
            await axios.post(apiUrl("/admin/maintenance/process-decay"));
            alert('Decay processing triggered');
        } catch {
            alert('Failed to trigger decay');
        }
    };

    if (loading) return <div className="p-8 text-gray-500">Loading Configuration...</div>;

    return (
        <div className="p-8 w-full h-full overflow-y-auto bg-gray-900 text-white">
            <div className="flext items-center gap-2 mb-6">
                <Shield className="text-red-500" size={28} />
                <h2 className="text-3xl font-bold tracking-tighter">ADMIN DASHBOARD</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Server Status Card */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3>
                            <Hammer className="text-blue-400" size={20}/> Server Control
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${config?.isMaintenanceMode ? 'bg-red-600 animate-pulse' : 'bg-green-600'}`}>
                            {config?.isMaintenanceMode ? 'MAINTENANCE MODE' : 'ONLINE'}
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-black rounded border-gray 700">
                            <span>Maintenance Mode</span>
                            <button
                                onClick={toggleMaintenance}
                                disabled={saving}
                                className={`px-4 py-2 rounded font-bold transition-colors ${config?.isMaintenanceMode ? 'bg-green-700 hover:bg-green-600' : 'bg-red-700 hover:bg-red-600'}`}
                            >
                                {config?.isMaintenanceMode ? 'DEACTIVATE' : 'ACTIVATE'}
                            </button>
                        </div>

                         <div className="flex justify-between items-center p-3 bg-black rounded border border-grey-700">
                            <div>
                                <span>Bypass Maintenance</span>
                                <span className="text-[10px] text-gray-500 uppercase">Allow admins to enter during lock</span>
                            </div>
                            <input
                                type="checkbox"
                                checked={config?.bypassMaintenance}
                                className="w-5 h-5 accent-blue-500"
                                onChange={() => {}} // TODO: Implement update
                            />
                         </div>
                    </div>
                </div>

                {/* Maintenance Task Card*/}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl fount-semibold mb-4 flex items-center gap-2">
                        <RefreshCw size={20} className="text-yellow-400"/> Maintenance Tasks
                    </h3>
                    <div className="space-y-3">
                        <button
                            onClick={triggerDecay}
                            className="w-full flex justify-between items-center p-3 bg-gray-900 hover:bg-black rounded border border-gray-700 transition-colors"
                        >
                            <div className="flex flex-col text-left">
                                <span className="font-medium text-yellow-500 uppercase text-sm tracking-wide">Force Item Decay</span>
                                <span className="text-[10px] text-gray-500">Run the daily maintenance item degradation script now</span>
                            </div>
                            <AlertTriangle size={18} className="text-yellow-600" />
                        </button>

                        <button
                            className="w-full flex justify-between items-center p-3 bg-gray-900 hover:bg-black rounded border border-gray-700 transition-colors"
                        >
                            <div className="flex flect-col text-left">
                                <span className="font-medium text-blue-500 uppercase text-sm tracking-wide">Purge Audit</span>
                                <span className="text-[10px] text-gray-500">Offload logs to S3 and prune local storage</span>
                            </div>
                            <Save size={18} className="text-blue-600" />
                        </button>
                    </div>
                </div>

                {/* World Configuration Card */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <LayoutGrid size={20} className="text-purple-400"/> World Configuration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-gray-500 uppercase font-bold">WAL Buffer Size</label>
                            <input
                                type="number"
                                value={config?.bufferSize}
                                className="bg-black border border-gray-700 p2 rounded text-blue-400"
                                onChange={() => {}}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-gray-500 uppercase font-bold">Daily Maintenance Time (HH:MM)</label>
                            <input
                                type="text"
                                value={config?.maintenanceStart}
                                className="bg-black border border-gray-700 p2 rounded text-blue-400"
                                onChange={() => {}}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-gray-500 uppercase font-bold">Maintenance Duration (Minutes)</label>
                            <input
                                type="number"
                                value={maintenanceMinutes}
                                className="bg-black border border-gray-700 p2 rounded text-blue-400"
                                onChange={(e) => setMaintenanceMinutes(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-gray-500 uppercase font-bold">Log Prune Days</label>
                            <input
                            type="text"
                            value={config?.logPruneDays}
                            className="bg-black border border-gray-700 p2 rounded text-blue-400"
                            onChange={() => {}}
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-bold transition-transform active:scale-95">
                            <Save size={18}/> SAVE WORLD CONFIGS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
