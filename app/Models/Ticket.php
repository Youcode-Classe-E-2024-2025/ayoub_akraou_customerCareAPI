<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = [
        'subject', 'description', 'customer_id', 'assigned_agent_id', 'status', 'claimed_at', 'resolved_at'
    ];
}
